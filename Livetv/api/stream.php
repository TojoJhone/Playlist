<?php
header("Content-Type: application/json; charset=utf-8");

$url = $_GET['url'] ?? '';
if (!$url) {
  echo json_encode(["error"=>"URL missing"]);
  exit;
}

$ch = curl_init($url);
curl_setopt_array($ch, [
  CURLOPT_NOBODY => true,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_USERAGENT => "Mozilla/5.0",
  CURLOPT_TIMEOUT => 15
]);

curl_exec($ch);

$final = curl_getinfo($ch, CURLINFO_EFFECTIVE_URL);
$type  = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

curl_close($ch);

echo json_encode([
  "final" => $final,
  "type"  => $type
]);
