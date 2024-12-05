import { cva } from "class-variance-authority";

const classes = cva("border h-12 rounded-full px-6 font-medium", {
  variants: {
    variant: {
      primary: "bg-blue-700 text-neutral-950 border-blue-700",
      secondary: "border-white text-white bg-transparent",
    },
  },
});

export default function Buttons({ variant, className, ...otherProps }) {
  return (
    <button
      className={`${classes({ variant })} ${className || ""}`}
      {...otherProps}
    />
  );
}
