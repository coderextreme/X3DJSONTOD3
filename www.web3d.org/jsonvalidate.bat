echo RESULTS > C:\www.web3d.org\jsonresults.txt
dir /s /b *.json > C:\www.web3d.org\jsonfiles.txt
FOR /F %%k in (C:\www.web3d.org\jsonfiles.txt) DO (
	type C:\www.web3d.org\header.js %%k | node
)  >> C:\www.web3d.org\jsonresults.txt 2>>&1
type C:\www.web3d.org\jsonresults.txt

