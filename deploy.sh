docker build -t spoonobi/multi-client:latest -t spoonobi/multi-client:$SHA -f ./client/Dockerfile ./client
docker build -t spoonobi/multi-server:latest -t spoonobi/multi-server:$SHA -f ./server/Dockerfile ./server
docker build -t spoonobi/multi-worker:latest -t spoonobi/multi-worker:$SHA -f ./worker/Dockerfile ./worker

docker push spoonobi/multi-client:latest
docker push spoonobi/multi-client:$SHA
docker push spoonobi/multi-server:latest
docker push spoonobi/multi-server:$SHA
docker push spoonobi/multi-worker:latest
docker push spoonobi/multi-worker:$SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=spoonobi/multi-server:$SHA
kubectl set image deployments/client-deployment client=spoonobi/multi-client:$SHA
kubectl set image deployments/worker-deployment worker=spoonobi/multi-worker:$SHA
