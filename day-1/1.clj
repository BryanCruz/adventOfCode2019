(defn findFuel [mass]
    (- 
    (int (Math/floor (/ mass 3)))
    2))

(println 
  (reduce 
    #(+ %1 (findFuel (Integer/parseInt %2)))
    0
    (line-seq (java.io.BufferedReader. *in*))
    ))
