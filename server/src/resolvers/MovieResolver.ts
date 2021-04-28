import { Movie } from "../entity/Movie";
import {
  Arg,
  Field,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class MovieInput {
  @Field()
  title: string;

  @Field(() => Int)
  duration: number;
}

@Resolver()
export class MovieResolver {
  @Query(() => [Movie])
  movies() {
    return Movie.find();
  }

  @Mutation(() => Movie)
  async createMovie(@Arg("options", () => MovieInput) options: MovieInput) {
    const movie = await Movie.create(options).save();
    return movie;
  }
}
