import { TransformFnParams } from 'class-transformer';

// Trim spaces from a string and collapse multiple spaces into one

export function trimString({ value }: TransformFnParams) {
  if (typeof value !== 'string') return value;
  return value.trim().replace(/\s+/g, ' ');
}

//Trim all strings inside an array

export function trimStringArray({ value }: TransformFnParams) {
  if (!Array.isArray(value)) return value;
  return value.map((v) =>
    typeof v === 'string' ? v.trim().replace(/\s+/g, ' ') : v,
  );
}
