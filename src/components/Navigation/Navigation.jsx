import clsx from "clsx";
import css from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

export const Navigation = () => {
  const activeLinkClass = ({ isActive }) => {
    return clsx(css.navigationItem, { [css.active]: isActive });
  };
  return (
    <nav className={css.navigationWrapper}>
      <NavLink to="/" className={activeLinkClass}>
        Home
      </NavLink>
      <NavLink to="/movies" className={activeLinkClass}>
        Movies
      </NavLink>
    </nav>
  );
};
