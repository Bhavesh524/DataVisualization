rm(list=ls())
df <- read.csv('F:/TCD_HT/Data_Visualization/visualization/IPL/data/allmatches.csv')
col_names <- colnames(df)
out <- split( df , f = df$Year)
Year <- 0
runs_s1 <- 0
wickets_s1 <- 0
for (i in 1:11) {
  s1 <- data.frame(out[i])
  colnames(s1) <- c(col_names)
  Year[i] <- s1$Year[1]
  runs_s1[i] <- sum(s1$Score)
  wickets_s1[i] <- sum(s1$Wicket_taken)
  ref <- as.data.frame(cbind(Year,runs_s1, wickets_s1 ))
}
df2 <- read.csv('F:/TCD_HT/Data_Visualization/visualization/IPL/data/MI_record.csv')
Position <- df2$Position
ref1 <- as.data.frame(cbind(ref,Position))

df3 <- read.csv('F:/TCD_HT/Data_Visualization/visualization/IPL/data/headcoach.csv')
Coach <- df3$Name
win_per <- df3$Win.
ref2 <- as.data.frame(cbind(ref1,Coach, win_per))

write.csv(ref2, 'F:/TCD_HT/Data_Visualization/visualization/IPL/data/sum1.csv', row.names = FALSE)


