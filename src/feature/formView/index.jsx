import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiConstant } from "../../constant/apiConatant";

export const FormView = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [id,setID]=useState(null);
  const form = useRef(null);

  const initialFetch = async () => {
    try {
      const { data } = await axios.get(apiConstant.getFormData, {
        params: { templateId: location.state.data.id, userId: 1 },
      });

      if (data?.status) {
        setIsLoading(false);
      }
if(data.data){
    setID(data?.data?.id)
      const formValues = JSON.parse(data?.data?.formData || "{}");
      Object.keys(formValues).forEach((key) => {
        const element = form.current.querySelector(`[name="${key}"]`);
        if (element) {
          if (element.type === "checkbox" || element.type === "radio") {
            element.checked = formValues[key] === element.value;
          } else {
            element.value = formValues[key];
          }
        }
      });}
    } catch (error) {
      console.error("Error fetching form data:", error);
    }
  };

  useEffect(() => {
    initialFetch();
    // eslint-disable-next-line
  }, []); // Adding an empty dependency array to avoid calling initialFetch repeatedly

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post(apiConstant.submitForm, {
        id,
        formData: JSON.stringify(formValues),
        templateId: location.state.data.id,
        userId: 1,
      });
      console.log("Form submission response:", res);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  if (isLoading) {
    return <h2>Your form is Loading...</h2>;
  }

  return (
    <div style={{}}>
      <form
        dangerouslySetInnerHTML={{ __html: location.state.data.template }}
        onSubmit={handleFormSubmit}
        ref={form}
        style={{maxWidth:700}}
      />
    </div>
  );
};
