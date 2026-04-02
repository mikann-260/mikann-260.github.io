document.getElementById("js-enabled").hidden = false;

if (!new URLSearchParams(window.location.search).has("disable")) {
  const script = document.createElement("script");
  script.src = "https://static.cloudflareinsights.com/beacon.min.js";
  script.defer = true;
  script.setAttribute(
    "data-cf-beacon",
    '{"token": "2ef183f9463a46c8a32bc608fec54eaf"}',
  );
  document.head.appendChild(script);
}
