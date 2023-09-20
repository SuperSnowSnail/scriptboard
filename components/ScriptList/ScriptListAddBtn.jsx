"use client";

import { Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import TextInput from "@/components/Inputs/TextInput";
import Icon from "@/components/Icon";

const ScriptListAddBtn = ({ role }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [directories, setDirectories] = useState([]);

  useEffect(() => {
    const fetchDirectories = async () => {
      const response = await fetch("/api/scripts/directories");
      const result = await response.json();
      setDirectories(result.directories);
    };

    fetchDirectories();
  }, []);

  const validationSchema = yup.object().shape({
    directory: yup
      .string()
      .strict()
      .trim()
      .required("Required")
      .max(50, "No more than 50 characters")
      .matches(
        /^[^\s^\x00-\x1f\\?*:"";<>|\/.][^\x00-\x1f\\?*:"";<>|\/]*[^\s^\x00-\x1f\\?*:"";<>|\/.]+$/g,
        "Not valid directory name",
      )
      .notOneOf(directories, "Directory already exist"),
  });

  const formik = useFormik({
    initialValues: {
      directory: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      const response = await fetch("/api/scripts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      console.log(result);
      setSubmitting(false);
      setModalOpen(false);
    },
  });

  if (role === "USER" || role === "PREMIUM") {
    return null;
  }

  return (
    <>
      <button
        className="flex items-center justify-center rounded-lg border border-green-700 px-3 py-2 text-green-700 hover:bg-green-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-green-300 dark:border-green-500 dark:text-green-500 dark:hover:bg-green-600 dark:hover:text-white dark:focus:ring-green-800"
        onClick={() => setModalOpen(true)}
        type="button"
      >
        <Icon name="plus" size={4} />
      </button>
      <Modal dismissible show={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={formik.handleSubmit}>
          <fieldset disabled={formik.isSubmitting}>
            <Modal.Header>Create new script</Modal.Header>
            <Modal.Body>
              <TextInput
                path="directory"
                formik={formik}
                label="Working directory"
                placeholder="some_dir"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button
                color="success"
                isProcessing={formik.isSubmitting}
                type="submit"
              >
                Send
              </Button>
            </Modal.Footer>
          </fieldset>
        </form>
      </Modal>
    </>
  );
};

export default ScriptListAddBtn;
