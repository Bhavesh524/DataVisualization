rm(list=ls())
df <- read.csv('F:/TCD_HT/Data_Visualization/visualization/IPL/data/allmatches.csv')
df1 <- subset(df, select = c(1,9,7,12))
df2 <- aggregate(cbind(df1$Score, df1$Wicket_taken) ~ df1$Team2 + df1$Year, data=df1, FUN=sum)
colnames(df2) <- c("Opponent", 'Year', 'Runs', 'Wicket')

write.csv(df2, 'F:/TCD_HT/Data_Visualization/visualization/IPL/data/sum_split1.csv', row.names = FALSE)


