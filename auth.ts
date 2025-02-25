import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"

 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks:{
    // you can call them using object .method or you canjust destructure the user and profile 
    async signIn({user:{name,email,image ,_id},profile}){
      const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id:profile?.id});

      if (!existingUser) {
        await writeClient.create({
          _type:'author',
          _id:_id,
          id:profile?.id,
          name:name,
          username:profile?.login,
           email:email,
           image:image,
           bio:profile?.bio ||""
        });
      }
      return true;
    },
    async jwt({token,account,profile}){
      console.log(token)
      console.log(profile)
      if (account&& profile) {
        const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id:profile?.id});
        console.log(user)
        token.id = user?._id||profile.id;
      }
      return token;
    },
    async session({session,token}){
      if (token?.id){
        console.log(token)
        session._id = token.id;
        session.user._id = token.id;
        Object.assign(session,{id:token.id});
        return session;
      }
    }

  }
})