import {Builder} from "./Builder";

export abstract class BaseBuilder<T> implements Builder<T>{
    protected abstract entity: T;
    public build():T{
        return this.entity;
    }
}