import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { GET_ALL_RECIPE, GET_RECIPEBY_ID } from "./GraphQL/RecipeQuery";
import {
  CREATE_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
} from "./GraphQL/RecipeMutation";
import { useQuery, useMutation } from "@apollo/client";
import MUICard from "./core/ui/MUICard";
import MUITextField from "./core/ui/MUITextField";
import MUIBox from "./core/ui/MUIBox";
import MUIButton from "./core/ui/MUIButton";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Recipe = () => {
  const [recipeId, setRecipeId] = useState("");
  const { error, loading, data } = useQuery(GET_ALL_RECIPE);
  const {
    error: idError,
    loading: isRecipeByIdLoading,
    data: recipeByidData,
  } = useQuery(GET_RECIPEBY_ID , {
    variables: { id: recipeId },
  });
  const [createRecipe, { error: graphQLerror }] = useMutation(CREATE_RECIPE, {
    refetchQueries: () => [{ query: GET_ALL_RECIPE }],
  });
  const [deleteRecipe] = useMutation(DELETE_RECIPE, {
    refetchQueries: () => [{ query: GET_ALL_RECIPE }],
  });
  const [editRecipe] = useMutation(EDIT_RECIPE, {
    refetchQueries: () => [{ query: GET_ALL_RECIPE }],
  });

  const [open, setOpen] = React.useState(false);
  const [recipes, setRecipes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (data) setRecipes(data.getAllRecipe);
  }, [data]);

  useEffect(() => {
    if (recipeByidData) {
      const { recipe } = recipeByidData;
      setName(recipe.name);
      setDescription(recipe.description);
    }
  }, [recipeByidData]);

  const handleDelete = (id) => {
    setOpen((prev) => !prev);
    deleteRecipe({ variables: { id: id } });
  };

  useEffect(() => {
    let timer = null;
    timer = setTimeout(() => {
      if (open) setOpen(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [handleDelete]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "" || description == "") return;
    if (!recipeId) {
      createRecipe({
        variables: {
          recipeInput: { name, description },
        },
      });
    } else {
      editRecipe({
        variables: {
          id: recipeId,
          recipeInput: {
            name: name,
            description: description,
          },
        },
      });
    }
    setName("");
    setDescription("");
  };
  const handleEdit = (id) => {
    setRecipeId(id);
  };

  return (
    <>
      <div className="recipes">
        <div className="recipe-box">
          {!loading
            ? recipes.map((rec) => {
                return (
                  <MUICard
                    key={rec.id}
                    cardData={rec}
                    onClick={() => handleDelete(rec.id)}
                    handleEdit={() => handleEdit(rec.id)}
                  />
                );
              })
            : Array(6)
                .fill(null)
                .map((_, idx) => {
                  return (
                    <Skeleton
                      key={idx}
                      variant="rectangular"
                      width={250}
                      height={230}
                      style={{ borderRadius: "4px" }}
                    />
                  );
                })}
        </div>
        <div className="recipe-creation-box">
          <form onSubmit={handleSubmit}>
            <MUIBox
              BoxField={{
                sx: {
                  width: 300,
                  height: 300,
                  backgroundColor: "white",
                  borderRadius: "10px",
                  display: "grid",
                  placeItems: "center",
                },
              }}
            >
              <MUITextField
                field={{
                  name: "name",
                  label: "Recipe Name",
                  variant: "outlined",
                  type: "string",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                }}
              />
              <MUITextField
                field={{
                  name: "description",
                  type: "string",
                  label: "Description",
                  variant: "outlined",
                  value: description,
                  onChange: (e) => setDescription(e.target.value),
                }}
              />
              <MUIButton
                buttonFields={{
                  variant: "outlined",
                  type: "submit",
                  style: { width: "220px" },
                }}
              >
                submit
              </MUIButton>
            </MUIBox>
          </form>
        </div>
      </div>
      <Snackbar open={open} autoHideDuration={2000}>
        <Alert severity="info">Recipe deleted successfully</Alert>
      </Snackbar>
    </>
  );
};

export default Recipe;
