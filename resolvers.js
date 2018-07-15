exports.resolvers = {
    Query: {
        getAllRecipes : async (root, args, { Recipe }) => {
            return await Recipe.find();
        }
    },

    Mutation: {
        addRecipe: async (root, 
            { /*this param is the args */
                name,
                category,
                description,
                instructions,
                createdDate,
                likes,
                username
            }, { /*this param is the context */
                Recipe 
            }) => {
                const newRecipe = await new Recipe({
                    name,
                    description,
                    category,
                    instructions,
                    username
                }).save();
                return newRecipe;
        }
    }
}