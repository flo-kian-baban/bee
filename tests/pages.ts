/** Every page on the site. Pilot and Privacy join in milestone 4. */
export const home = { name: "home", path: "/", status: 200 };
export const notFound = { name: "not-found", path: "/page-that-does-not-exist", status: 404 };
export const pages = [home, notFound];

/** The widths every page is checked and photographed at: phone, tablet, desktop. */
export const widths = [375, 768, 1440];
