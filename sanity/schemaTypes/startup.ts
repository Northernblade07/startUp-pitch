// make a export function just like with mongdb and then define name , title , type-document ,and then feilds - which is a array including defineField for defining each field 
// install sanity-plugin-markdown for using markdown type which is a custom type of a field
import { defineField, defineType } from "sanity";

export const Startup = defineType({
    name:"startup",
    title:"Startup",
    type:"document",
    fields:[
        defineField({
            name: "title",
            type:'string'
        }),
        defineField({
            name: "slug",
            type:'slug',
            options:{
                source:'title'
            }
        }),
        defineField({
            name: "author",
            type:'reference',
            to:{type:'author'}
        }),
        defineField({
            name: "views",
            type:'number'
        }),
        defineField({
            name: "description",
            type:'text'
        }),
        defineField({
            name: "category",
            type:'string',
            validation:(Rule)=>Rule.min(1).max(20).required().error("please enter a category"),
        }),
         defineField({
            name: "image",
            type:'url',
            validation:(Rule)=>Rule.required(),
        }),
        defineField({
            name: "pitch",
            type:'markdown',
        }),
    ],
})