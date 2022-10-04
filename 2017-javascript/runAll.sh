for i in {0..9}; do
  if [ $i -gt 9 ]; then
  node "day${i}.js"
  else
  node "day0${i}.js"
  fi

done
