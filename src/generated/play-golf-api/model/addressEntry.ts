/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { Address } from './address';


export interface AddressEntry { 
    /**
     * Set to true if primary address
     */
    primary?: boolean;
    address?: Address;
    /**
     * type of address (e.g. home, mobile, work)
     */
    type?: string;
}
