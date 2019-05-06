load("//tools/build_defs/js/devserver:defs.bzl", "js_devserver")

js_library(
    name = "gator",
    srcs = glob(
        ["js/*.js"],
    ),
)

js_devserver(
    name = "gator_dev",
    data = [
        "css/index.css",
        "index.html",
        "js/index.js",
    ],
    deps = [":gator"],
)
