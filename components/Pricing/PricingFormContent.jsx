"use client";

const PricingFormContent = ({ children, formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <fieldset disabled={formik.isSubmitting} className="mb-3 flex items-end">
        <div className="mb-3 flex w-full max-w-md items-center">{children}</div>
      </fieldset>
    </form>
  );
};

export default PricingFormContent;
