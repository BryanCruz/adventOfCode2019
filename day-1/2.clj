(defn findFuel [mass]
    (let 
    [fuel (- 
          (int (Math/floor (/ mass 3)))
          2)]
    (if (> fuel 0) (+ fuel (findFuel fuel)) 0)))

(println 
  (reduce 
    #(+ %1 (findFuel (Integer/parseInt %2)))
    0
    (line-seq (java.io.BufferedReader. *in*)))) 