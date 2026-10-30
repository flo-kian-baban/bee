/** Every page on the site. Pilot and Privacy join in milestone 4. */
export const home = { name: "home", path: "/", status: 200 };
export const notFound = { name: "not-found", path: "/page-that-does-not-exist", status: 404 };
export const pages = [home, notFound];

/**
 * The widths every page is checked at: phone, tablet, 1024px (where layouts
 * first go to three and four columns, at their narrowest), 1280px (where
 * content reaches its full width) and desktop.
 */
export const widths = [375, 768, 1024, 1280, 1440];

/** The widths of the milestone report screenshots (CLAUDE.md, Workflow): phone, tablet, desktop. */
export const screenshotWidths = [375, 768, 1440];
