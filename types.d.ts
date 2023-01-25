import {BeDecoratedProps, MinimalProxy} from 'be-decorated/types';

export interface EndUserProps {
    props: {[key: string]: any};
}
export interface VirtualProps extends EndUserProps, MinimalProxy{}

export type Proxy = Element & VirtualProps

export interface PP extends VirtualProps { //ProxyProps
    proxy: Proxy
}

export type PPP = Partial<PP>;

export interface Actions{
    setProps(pp: PP, mold: PPP): Promise<PPP>
}