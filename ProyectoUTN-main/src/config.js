import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000; 
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Xif3egke4axi1.";
export const DB_DATABASE = process.env.DB_DATABASE || "mantenimiento_db";
export const DB_PORT = process.env.DB_PORT || 3306;
export const SECRET_KEY = process.env.SECRET_KEY || "fevs_^#_n@gw!m0nc!_t-6&kwts93tda4x2y(0f9-_@%h-xo*r";
