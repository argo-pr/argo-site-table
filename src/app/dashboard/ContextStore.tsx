"use client";

import {Context, createContext} from "react";
import {IContext} from "../../../types/custom-types";

export const ContextStore: Context<IContext> = createContext({
    userStore: [] as IContext["userStore"],
    orderStore: [] as IContext["orderStore"]
});