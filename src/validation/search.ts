import * as yup from "yup";

export const searchScheme = yup.object({
	breed: yup.string().trim().required("Please select a dog breed"),
});
