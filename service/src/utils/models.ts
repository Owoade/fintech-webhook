import { DataTypes } from "sequelize";

const model_types = {
  string() {
    return {
      type: DataTypes.STRING,
      allowNull: false,
    };
  },

  unique_string() {
    return {
      ...this.string(),
      unique: true,
    };
  },

  int() {
    return {
      type: DataTypes.INTEGER,
      allowNull: false,
    };
  },

  float() {
    return {
      type: DataTypes.FLOAT,
      allowNull: false,
    };
  },

  double(){
    return {
      type: DataTypes.DOUBLE,
      allowNull: false
    }

  },

  enum(...val: string[]){
    return {
      type: DataTypes.ENUM(...val),
      allowNull: false
    }
  },

  int_auto(){
    return {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    };
  },


  primary_key() {
    return {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    };
  },
}; 

export default model_types