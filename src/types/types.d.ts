import { Request } from "express";

// Param types
export type IdParams = { id: number };
export type IdAndEntityParams = { id: number, entityId: number }

export interface RequestWithParams<T> extends Request {
    params: T
}