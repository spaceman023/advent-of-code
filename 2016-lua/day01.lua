local f = io.open("./inputs/day01-input.txt"):read("*all")
local currDirection = "North"
Directions = {}
local point = { x = 0, y = 0 }
local visited = {}

local index = 1
for w in f:gmatch("([^,]+),?") do
  Directions[index] = w
  index = index + 1
end

for _, val in pairs(Directions) do
  local direction = string.sub(val, 1, 1)
  local steps = tonumber(string.sub(val, 2, string.len(val)))

  if currDirection == "North" then
    if direction == "L" then
      currDirection = "West"
    elseif direction == "R" then
      currDirection = "East"
    end
  elseif currDirection == "South" then
    if direction == "L" then
      currDirection = "East"
    elseif direction == "R" then
      currDirection = "West"
    end
  elseif currDirection == "West" then
    if direction == "L" then
      currDirection = "South"
    elseif direction == "R" then
      currDirection = "North"
    end
  elseif currDirection == "East" then
    if direction == "L" then
      currDirection = "North"
    elseif direction == "R" then
      currDirection = "South"
    end
  end

  if currDirection == "North" then
    for a = 1, steps do
      local pointKey = point.x .. "," .. point.y + a
      if visited[pointKey] == true then
        print(pointKey)
        print(math.abs(point.x) + math.abs(point.y + a))
      else visited[pointKey] = true
      end
    end
    point.y = point.y + steps

  elseif currDirection == "South" then
    for a = 1, steps do
      local pointKey = point.x .. "," .. point.y - a
      if visited[pointKey] == true then
        print(pointKey)
        print(math.abs(point.x) + math.abs(point.y - a))
      else visited[pointKey] = true
      end
    end
    point.y = point.y - steps

  elseif currDirection == "West" then
    for a = 1, steps do
      local pointKey = point.x - a .. "," .. point.y
      if visited[pointKey] == true then
        print(pointKey)
        print(math.abs(point.x - a) + math.abs(point.y))
      else visited[pointKey] = true
      end
    end
    point.x = point.x - steps

  elseif currDirection == "East" then
    for a = 1, steps do
      local pointKey = point.x + a .. "," .. point.y
      if visited[pointKey] == true then
        print(pointKey)
        print(math.abs(point.x + a) + math.abs(point.y))
      else visited[pointKey] = true
      end
    end
    point.x = point.x + steps
  end
end
print(math.abs(point.x) + math.abs(point.y))
