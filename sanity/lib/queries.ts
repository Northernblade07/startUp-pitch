import { defineQuery } from "next-sanity";

export const STARTUPS_QUERY =   defineQuery(
    `*[_type == "startup" && defined(slug.current) && !defined($search)|| category match $search || title match $search || author->name match $search] | order(_createdAt desc) {
  _id,
    title,slug,_createdAt,
    author->{_id,name,image,bio},
    views,description,category,image
}

`)

export const STARTUP_BY_ID_QUERY =  defineQuery(
  `*[_type == "startup" && defined(slug.current) && _id== $id ][0]{
  _id,
    title,slug,_createdAt,
    author->{_id,name,image,bio,username},
    views,description,category,image,pitch
}`
)

export const STARTUP_VIEWS_QUERY = defineQuery(`
 *[_type == "startup" && _id ==$id][0]{
 _id,
 views
 }
  `)

  // SOLUTION FOR 'NO id OR _id SHOWING PROBLEM  IN SESSION'

  // the issue was thath you were checking the existing user by providing profile id or you can say just id, but you were comparing the provided id with the _id of the user
  //  and that's why when you were fetching the user you were not getting the desired result and hence there was no _id or id field in the user or session  
  export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
    *[_type == "author" && id == $id][0]{
    name,
    _id,
    username,
    email,
    image,
    bio,
    }
    `)

    export const AUTHOR_BY_ID_QUERY = defineQuery(`
      *[_type=='author' && _id == $id][0]{
      id,
      _id,
      name,
      username,
      bio,
      email,
      image,}`)

      export const STARTUPS_BY__AUTHOR_QUERY =   defineQuery(
        `*[_type == "startup" && author._ref == $id] | order(_createdAt desc) {
      _id,
        title,slug,_createdAt,
        author->{_id,name,image,bio},
        views,description,category,image
    }
    
    `)