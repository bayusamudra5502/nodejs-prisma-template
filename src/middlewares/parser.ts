import express from 'express';
import bodyParser from 'body-parser';

export const jsonParser = express.json();
export const urlEncodeParser = bodyParser.urlencoded({ extended: false });
