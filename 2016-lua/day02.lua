local f = io.open("./inputs/2"):read("*all")
local keypad = {
  { 1, 2, 3 },
  { 4, 5, 6 },
  { 7, 8, 9 }
}
local x, y = 2, 2
local code = ""
for line in f:gmatch("[^\n]+") do
  for c in line:gmatch(".") do
    if c == "U" and y > 1 then y = y - 1 end
    if c == "D" and y < 3 then y = y + 1 end
    if c == "L" and x > 1 then x = x - 1 end
    if c == "R" and x < 3 then x = x + 1 end
  end
  code = code .. keypad[y][x]
end
print(code)
local keypad2 = {
  { nil, nil, 1, nil, nil },
  { nil, 2, 3, 4, nil },
  { 5, 6, 7, 8, 9 },
  { nil, "A", "B", "C", nil },
  { nil, nil, "D", nil, nil }
}
local x, y = 1, 3
local code2 = ""
for line in f:gmatch("[^\n]+") do
  for c in line:gmatch(".") do
    if c == "U" and y > 1 and keypad2[y - 1][x] ~= nil then y = y - 1 end
    if c == "D" and y < 5 and keypad2[y + 1][x] ~= nil then y = y + 1 end
    if c == "L" and x > 1 and keypad2[y][x - 1] ~= nil then x = x - 1 end
    if c == "R" and x < 5 and keypad2[y][x + 1] ~= nil then x = x + 1 end
  end
  code2 = code2 .. keypad2[y][x]
end
print(code2)
