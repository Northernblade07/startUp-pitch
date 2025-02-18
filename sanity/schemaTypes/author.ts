// make a export function just like with mongdb and then define name , title , type-document ,and then feilds - which is a array including defineField for defining each field ,
// if u want you can include defination of icon and then there is preview which include select and inside that is title defined to name 
import { UserIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const author = defineType({
    name:"author",
    title:"Author",
    type:"document",
    icon: UserIcon,
    fields:[
        defineField({
            name: "id",
            type:'number'
        }),
        defineField({
            name: "name",
            type:'string'
        }),
        defineField({
            name: "username",
            type:'string'
        }),
        defineField({
            name: "email",
            type:'string'
        }),
        defineField({
            name: "image",
            type:'url'
        }),
         defineField({
            name: "bio",
            type:'text'
        }),
    ],
    preview:{
        select:{
            title:'name'
        },
    }
})