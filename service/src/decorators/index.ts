import Joi from "joi";
import respond from "../utils/respond";

const ServiceDecorator = {
  forValidatingPayload(validator: Joi.ObjectSchema, type?: "body" | "query") {
    return function (
      target: any,
      propertyKey: string,
      descriptor: PropertyDescriptor
    ) {

      const originalMethod = descriptor.value;

      descriptor.value = async function (...args: any) {

        const [ request, response ] = args

        const validation = validator.validate(request[type ?? "body"]);

        if( validation.error ){
            return respond(response, {
                code: 400,
                message: validation.error.message,
                data: {}
            })
        }

        const result = await originalMethod.apply(this, args);

        return result;
      };
    };
  },
  forCatchingDatabaseException(){
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
      ) {
  
        const originalMethod = descriptor.value;
  
        descriptor.value = async function (...args: any) {

        const [request, response] = args;

        try{

            const result = await originalMethod.apply(this, args);

            return result;

        }catch(e: any){

            respond( response, {
                code: 400,
                data: {},
                message: e?.errors?.[0]?.message
            })
            
        }

        };
      };
  }
};

export default ServiceDecorator;