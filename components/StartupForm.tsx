"use client"
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea';
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { formSchema } from '@/lib/validation';
import {z} from "zod"
import { useRouter } from 'next/navigation';
import { createPitch } from '@/lib/actions';



const StartupForm = () => {
    const [error, setError] = useState<Record<string, string>>({});
    const [pitch, setpitch] = useState('**hello world**');
    const router = useRouter();
    
    //   useActionState hook from the react and use it for submitting the form fields 

const handleFormSubmit =async(prevState:FormData,formData:FormData)=>{
    try {
        setError({});
        const formValues = {
            title:formData.get("title") as string,
            description:formData.get("description") as string,
         category:formData.get("category") as string,
            link:formData.get("link") as string,
            pitch,
        }

        await formSchema.parseAsync(formValues);
        console.log(formValues);

        const result = await createPitch(prevState,formData,pitch);
        console.log(result);
        if (result.status === "SUCCESS") {
            console.log(result);
            router.push(`/startup/${result._id}`)
        }

        return result;
    } catch (error) {
        if (error instanceof z.ZodError){
            const fieldError = error.flatten().fieldErrors;
            setError(fieldError as unknown as Record<string,string>);
            return {...prevState,
                error:"validation failed",
                status:"ERROR",
            }
        }
        
        return{...prevState,error:"unexpected error",status:"ERROR"}
    }
}

const [formAction,isPending] =useActionState(handleFormSubmit,{error:"" , status:"INITIAL"});
    return (
        <form action={formAction} className='startup-form'>
            <div>
                <label htmlFor="title" className='startup-form_label'>title</label>
                <Input id='title' className='startup-form_input' name='title' placeholder='Startup Title' />
                {error.title && <p className='startup-form_error'>{error.title}</p>}
            </div>

            <div>
                <label htmlFor="description" className='startup-form_label'>description</label>
                <Textarea id='description' className='startup-form_input' name='description' placeholder='Startup Description' />
                {error.description && <p className='startup-form_error'>{error.description}</p>}
            </div>

            <div>
                <label htmlFor="category" className='startup-form_label'>Category</label>
                <Input id='category' className='startup-form_input' name='category' placeholder='Startup category' />
                {error.category && <p className='startup-form_error'>{error.category}</p>}
            </div>

            <div>
                <label htmlFor="link" className='startup-form_label'>Image url</label>
                <Input id='link' className='startup-form_input' name='link' placeholder='Startup image url' />
                {error.link && <p className='startup-form_error'>{error.link}</p>}
            </div>

            <div data-color-mode="light">
                <label htmlFor="pitch">Pitch</label>
                <MDEditor preview='edit' height={300} style={{borderRadius:20,overflow:'hidden'}} id="pitch" value={pitch} onChange={(value)=>setpitch(value as string)}/>

                {error.pitch && <p>{error.pitch}</p>}
            </div>
  

        <Button className='startup-form_btn' type='submit' disabled={isPending}>
            {isPending?'submitting...':'submit'}</Button>

        </form>
    )
}

export default StartupForm
