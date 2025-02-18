import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query = (await searchParams).query
// before fetching data from sanity , create a queries.ts file in sanity/lib in which u will define a export const function and use defineQuery form sanity to pass the query inside ` `,then use the client from sanity to fetch the data
    // const posts = await client.fetch(STARTUPS_QUERY);

// for live data fetching , install npm i server-only so that some componets can run only on server and then check if there is a live.ts file , use the new method to fetch the data which is will real time data from sanity , it should be defined as {data:post} and uses sanityFetch which takes a object including query and pass the value Startups_query defined in the query.ts file 
  const params = {search:query||null};
  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY , params:params});

  console.log(JSON.stringify(posts , null,2))

  return (
  <>
  <section className="pink_container">
  <h1 className="heading">Pitch your startups</h1>

  <p className="sub-heading !max-w-3xl">
    submit ideas , vote on pitches and get noticed
  </p>

  <SearchForm query={query}/>
  </section>

  <section className="section_container">
      <p className="text-30-semibold">
        {
          query?(
`Search results for ${query}`
          ):"all Start-ups"
        }
      </p>

        <ul className="mt-5 card_grid">

      { posts.length>0?
        posts.map((item:StartupTypeCard,i:number)=>(
          <StartupCard item={item} key={i}/>
        )):(
          <p className="no-result">NO startups found</p>
        )
      }
      </ul>
  </section>
  <SanityLive/>
  </>
  );
}
