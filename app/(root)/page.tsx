import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({searchParams}:{searchParams:Promise<{query?:string}>}) {
  const query = (await searchParams).query

   const post = [{
    _createdAt: new Date(),
    views:55,
    author:{_id:1,
      name:"author"
    },
    _id:1,
    description:"this is description",
    image:"https://imgs.search.brave.com/wx2k6AYSjW8ggorHp_8HfQGvLHbJjyApqnFeYuu0A1g/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2I2L2Ex/L2E5L2I2YTFhOWM4/NTk2MzBiNDcyOTZj/YWZhNDcyZWMxYmFj/LmpwZw",
    category:"robots",
    title:"robots"
   }]
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

        <ul>

      { post.length>0?
        post.map((item,i)=>(
          <StartupCard item={item} key={i}/>
        )):(
          <p className="no-result">NO startups found</p>
        )
      }
      </ul>
  </section>
  </>
  );
}
