// router.js: reads the URL hash and shows the matching screen.
//
//   #/            → ListView        (done for you)
//   #/product/7   → DetailView(7)   (TODO: you build this view)
//   #/about       → AboutView       (done for you)
//   anything else → NotFoundView    (done for you)

import { ListView } from "./views/list.js";
import { DetailView } from "./views/detail.js";
import { AboutView } from "./views/about.js";
import { NotFoundView } from "./views/not-found.js";

const app = document.querySelector("#app");

function setActiveNav(currentRoute) {
  const links = document.querySelectorAll(".nav-list a");

  links.forEach((link) => {
    const route = link.dataset.route ?? "";
    const isCurrent = route === currentRoute;

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

export function router() {
  const hash = location.hash || "#/";
  const [_, page = "", param = ""] = hash.split("/");
  const normalizedPage = page || "";

  if (normalizedPage === "") {
    setActiveNav("");
    return ListView(app);
  }

  if (normalizedPage === "about") {
    setActiveNav("about");
    return AboutView(app);
  }

  if (normalizedPage === "product") {
    const id = Number(param);

    if (!Number.isInteger(id) || id <= 0) {
      setActiveNav("");
      return NotFoundView(app);
    }

    setActiveNav("");
    return DetailView(app, id);
  }

  setActiveNav("");
  return NotFoundView(app);
}
