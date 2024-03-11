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
import { Facilitator } from './facilitator';
import { Address } from './address';


export interface Location { 
    id?: string;
    _class?: string;
    name?: string;
    address?: Address;
    /**
     * A valid phone number.
     */
    phone?: string;
    /**
     * A valid email address.
     */
    email?: string;
    /**
     * A valid social media handle.
     */
    facebookHandle?: string;
    /**
     * A valid social media handle.
     */
    instagramHandle?: string;
    /**
     * A valid social media handle.
     */
    twitterHandle?: string;
    website?: string;
    staff?: Array<Facilitator>;
    managed?: boolean;
    /**
     * Geolocation points, stored as longitude, latitude
     */
    location?: Array<number>;
}

