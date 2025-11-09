;Initialization
START:
MOVI R1, #10  ; Move 10 to R1
MOVI R2, #20  ; Move 20 to R2
ADD R3, R1, R2
SUB R4, R3, R1
LOOP:
MUL R5, R4, R2
JN 100
;Store & Load
ST R5, #200
LD R6, #200
CMP R6, R5, R1
JL 50