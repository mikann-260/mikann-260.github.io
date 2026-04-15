---
---
const jsEnabled = document.getElementById("js-enabled");
if (jsEnabled) {
  jsEnabled.hidden = false;
}

const cloudflareDisable = new URLSearchParams(window.location.search);

if (cloudflareDisable.get("cloudflareDisable") === "true") {
  localStorage.setItem("cloudflare-disable", "true");
} else if (cloudflareDisable.get("cloudflareDisable") === "false") {
  localStorage.removeItem("cloudflare-disable");
}
if (localStorage.getItem("cloudflare-disable") !== "true") {
  const script = document.createElement("script");
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.defer = true;
  script.setAttribute(
    "data-cf-beacon",
    '{"token": "{{ site.cloudflare.token }}}"',
  );
  document.head.appendChild(script);
}
