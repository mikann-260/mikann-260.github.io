document.getElementById("js-enabled").hidden = false;

if (!new URLSearchParams(window.location.search).has("disable")) {
  const script = document.createElement("script");
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.defer = true;
  script.setAttribute(
    "data-cf-beacon",
    '{"token": "9e707a26d8b34fc5a82d3bb5afeba95b"}',
  );
  document.head.appendChild(script);
}
