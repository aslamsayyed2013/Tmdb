export interface Artist{
  id:string
  name:string,
  image:string,
  age:number,
  gender:number,
  placeOfBirth:string
  birthday: Date
}

export interface Movies{
  title:string,
  character:string,
  original_language:string,
  poster_path:string,
  vote_count:number
}

export interface TvCredits{
  original_name:string,
  character:string,
  original_language:string,
  poster_path:string,
  vote_count:number
}

export interface CombinedCredits{
  originalName:string,
  originalLanguage:string,
  posterPath:string,
  voteCount:number
}

export interface Actor{
  id:number,
  name:string,
  posterPath:string
}
