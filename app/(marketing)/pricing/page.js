"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFormik } from "formik";
import * as yup from "yup";

import { TextInput, Spinner, Button } from "flowbite-react";

import PricingTable from "@/components/Pricing/PricingTable";
import PricingCard from "@/components/Pricing/PricingCard";
import PricingForm from "@/components/Pricing/PricingForm";

import ThemeToggle from "@/components/ThemeToggle";
import GithubLink from "@/components/GithubLink";
import Icon from "@/components/Icon";

const EmailIcon = () => {
  return (
    <div className="text-gray-500 dark:text-gray-400">
      <Icon name="email" size={3.5} />
    </div>
  );
};

const UpgradePage = () => {
  const { data: session } = useSession();
  const githubEmail = session?.user.email;
  const currentRole = session?.user.role;

  const roles = ["USER", "PREMIUM", "SUPERUSER"];

  const validationSchema = yup.object().shape({
    email: yup.string().trim().email(),
    requestedRole: yup
      .string()
      .trim()
      .required("Choose plan")
      .notOneOf([currentRole], "Choose plan")
      .oneOf(
        roles.filter((role) => role !== currentRole),
        "Not valid plan",
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: githubEmail ?? "",
      requestedRole: currentRole ?? "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { setSubmitting }) => {
      const response = await fetch("/api/user/elevate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(values),
      });
      const result = await response.json();
      setSubmitting(false);
    },
  });

  const { setValues } = formik;

  useEffect(() => {
    setValues({
      email: githubEmail ?? "",
      requestedRole: currentRole ?? "",
    });
  }, [setValues, currentRole, githubEmail]);

  const inputRef = useRef(null);

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
    inputRef.current?.select();
  };

  const isInvalid =
    (formik.errors.email || formik.errors.requestedRole) &&
    formik.touched.email;

  const inputTheme = {
    field: {
      input: {
        colors: {
          gray: "bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
        },
      },
    },
  };

  const btnTheme = {
    base: "group flex items-stretch items-center justify-center text-center font-medium relative focus:z-10 focus:outline-none",
    color: {
      info: "text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:enabled:hover:bg-blue-700 dark:focus:ring-blue-800",
    },
    size: {
      md: "text-sm px-5 py-3",
    },
  };

  const spinnerTheme = {
    base: "inline animate-spin text-blue-700",
    color: {
      white: "fill-white",
    },
    light: {
      off: {
        base: "dark:text-blue-600",
      },
    },
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <div className="flex w-full max-w-7xl justify-end gap-4 p-6">
        <Link href={"/"} className="p-2">
          Home
        </Link>
        <Link href={"/pricing"} className="p-2">
          Docs
        </Link>
        <GithubLink />
        <ThemeToggle />
      </div>

      <PricingTable>
        <PricingTable.Header>
          <PricingTable.Title>In case you need more</PricingTable.Title>
          <PricingTable.Description>
            At Scriptboard our Starter plan can cover most of your needs, but if
            that is not enough, check out what we can offer to you:
          </PricingTable.Description>
        </PricingTable.Header>

        <PricingTable.Content>
          <PricingCard>
            <PricingCard.Title>Starter</PricingCard.Title>
            <PricingCard.Description>
              Start for free with GitHub account
            </PricingCard.Description>

            <PricingCard.Price>
              <span className="mr-2 text-5xl font-extrabold">Free</span>
            </PricingCard.Price>

            <PricingCard.List>
              <PricingCard.Pro>
                Run scripts through user-friendly interface
              </PricingCard.Pro>
              <PricingCard.Pro>
                Keep history of your previously executed scripts
              </PricingCard.Pro>
              <PricingCard.Pro>
                Up to 5 parallel running scripts
              </PricingCard.Pro>
              <PricingCard.Con>Access to premium scripts</PricingCard.Con>
              <PricingCard.Con>Speed dial (WIP)</PricingCard.Con>
              <PricingCard.Con>Contribute your own scripts</PricingCard.Con>
            </PricingCard.List>

            <PricingCard.Btn
              formik={formik}
              role="USER"
              currentRole={currentRole}
              scrollToInput={scrollToInput}
            />
          </PricingCard>

          <PricingCard>
            <PricingCard.Title>Premium</PricingCard.Title>
            <PricingCard.Description>
              All you need by fair price
            </PricingCard.Description>

            <PricingCard.Price>
              <span className="mr-2 text-5xl font-extrabold">$5</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </PricingCard.Price>

            <PricingCard.List>
              <PricingCard.Pro>
                Run scripts through user-friendly interface
              </PricingCard.Pro>
              <PricingCard.Pro>
                Keep history of your previously executed scripts
              </PricingCard.Pro>
              <PricingCard.Pro>
                Up to 20 parallel running scripts
              </PricingCard.Pro>
              <PricingCard.Pro>Access to premium scripts</PricingCard.Pro>
              <PricingCard.Pro>
                Speed dial up to 3 presets (WIP)
              </PricingCard.Pro>
              <PricingCard.Con>Contribute your own scripts</PricingCard.Con>
            </PricingCard.List>

            <PricingCard.Btn
              formik={formik}
              role="PREMIUM"
              currentRole={currentRole}
              scrollToInput={scrollToInput}
            />
          </PricingCard>

          <PricingCard>
            <PricingCard.Title>Super User</PricingCard.Title>
            <PricingCard.Description>
              For passionate contributors
            </PricingCard.Description>

            <PricingCard.Price>
              <span className="mr-2 text-5xl font-extrabold">Individual</span>
            </PricingCard.Price>

            <PricingCard.List>
              <PricingCard.Pro>
                Run scripts through user-friendly interface
              </PricingCard.Pro>
              <PricingCard.Pro>
                Keep history of your previously executed scripts
              </PricingCard.Pro>
              <PricingCard.Pro>
                Up to 50 parallel running scripts
              </PricingCard.Pro>
              <PricingCard.Pro>Access to premium scripts</PricingCard.Pro>
              <PricingCard.Pro>
                Speed dial up to 5 presets (WIP)
              </PricingCard.Pro>
              <PricingCard.Pro>Contribute your own scripts</PricingCard.Pro>
            </PricingCard.List>

            <PricingCard.Btn
              formik={formik}
              role="SUPERUSER"
              currentRole={currentRole}
              scrollToInput={scrollToInput}
            />
          </PricingCard>
        </PricingTable.Content>
      </PricingTable>

      <PricingForm>
        <PricingForm.Title>Contact us</PricingForm.Title>
        <PricingForm.Description>
          Send us request and our support team will contact you about upgrading
          your account to new plan. Note that you need to have a GitHub account
          in order to use our service, so it would be preferable if you send us
          Email address that connected to your GitHub account.
        </PricingForm.Description>

        <PricingForm.Content formik={formik}>
          <div className="relative mr-3 w-full">
            <label
              htmlFor="email"
              aria-hidden
              className="mb-2 hidden text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email address
            </label>
            <TextInput
              id="email"
              icon={EmailIcon}
              helperText={formik.errors?.requestedRole ?? ""}
              color={`${isInvalid ? "failure" : "gray"}`}
              theme={inputTheme}
              name="email"
              aria-label="Email Address"
              placeholder="Your email address..."
              required
              type="email"
              ref={inputRef}
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
          </div>
          <Button
            type="submit"
            className={`${isInvalid ? "mb-7" : ""}`}
            theme={btnTheme}
            isProcessing={formik.isSubmitting}
            processingSpinner={<Spinner theme={spinnerTheme} color="white" />}
          >
            Send
          </Button>
        </PricingForm.Content>
      </PricingForm>
    </div>
  );
};

export default UpgradePage;
