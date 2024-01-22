import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchUser, createUser } from "../../userSlice";
import { useEffect } from "react";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  lastName: Yup.string().required("El apellido es requerido"),
  email: Yup.string().email("Dirección de correo electrónico inválida").required("El correo electrónico es requerido"),
  phone: Yup.string().matches(/^[0-9]+$/, "El teléfono solo debe contener números").required("El teléfono es requerido"),
});

function Register({ id }) {
  const dispatch = useDispatch();
  const { entity: user } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch, id]);

  if (loading === "loading") return "Loading...";
  if (error) return "Error!";

  const initialValues = id
    ? user
    : {
        name: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        address: "",
      };

  return (
    <div className="gap-4 bg-stone-300 border rounded mt-10">
      <h1 className="text-center text-2xl font-bold py-2">Formulario de Registro</h1>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        //lógica de actualización del usuario...
        console.log(values);
        dispatch(createUser(values));
        resetForm(); // Limpia todos los campos del formulario    
      }}
    >  
      <Form className="flex flex-col ">
        <section className="flex items-center justify-center p-2">
          <label className="mr-4 pr-4" htmlFor="name">
            Name
          </label>
          <Field
            className="border-2 border-gray-300 rounded-md p-1"
            name="name"
            type="text"
          />
          <ErrorMessage className="text-red-500" name="name" component="div" />

          <label className="px-14 pr-4" htmlFor="lastName">
            Last Name
          </label>
          <Field
            className="border-2 border-gray-300 rounded-md p-1"
            name="lastName"
            type="text"
          />
          <ErrorMessage
            className="text-red-500"
            name="lastName"
            component="div"
          />
        </section>

        <section className="flex items-center justify-center p-2">
          <label className="pr-9" htmlFor="email">
            Email
          </label>
          <Field
            className="border-2 border-gray-300 rounded-md p-1"
            name="email"
            type="email"
          />
          <ErrorMessage className="text-red-500" name="email" component="div" />

          <label className="px-14 pr-12" htmlFor="phone">
            Phone
          </label>
          <Field
            className="border-2 border-gray-300 rounded-md p-1"
            name="phone"
            type="text"
          />
          <ErrorMessage className="text-red-500" name="phone" component="div" />
        </section>

        <section className="flex items-center mx-40 p-2">
          <label className="pr-4" htmlFor="country">Country</label>
          <Field
            className="border-2 border-gray-300 rounded-md p-1"
            name="country"
            type="text"
          />
          <ErrorMessage
            className="text-red-500"
            name="country"
            component="div"
          />
        </section>

        <section className="flex items-center mx-40 p-2">
          <label className="pr-4" htmlFor="address">
            Address
          </label>
          <Field
            className="border-2 border-gray-300 rounded-md p-1"
            name="address"
            as="textarea"
            rows="3"
          />
          <ErrorMessage
            className="text-red-500"
            name="address"
            component="div"
          />
        </section>

        <button
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 ml-96 mr-96 mt-20 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </Formik>
    </div>
  );
}

export default Register;
