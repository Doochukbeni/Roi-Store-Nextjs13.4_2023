import React from "react";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-200 hover:text-slate-700 dark:hover:text-neutral-300 transition-colors">
        {title}
      </h2>
      <p className="text-sm text-muted-foreground dark:hover:text-neutral-300 transition-colors">
        {description}
      </p>
    </div>
  );
};

export default Heading;
