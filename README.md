# CiscoLive_2026_labguide

## MySQL in Podman (on the VM)

**You run these on the VM**, not “add to a file” in the repo. Step 1 creates `~/.config/mysql-root.env` on that machine; step 2 starts the container.

```bash
mkdir -p ~/.config
cat > ~/.config/mysql-root.env <<'EOF'
MYSQL_ROOT_PASSWORD=Cisco
MYSQL_DATABASE=cisco_live_demo_db
EOF
chmod 600 ~/.config/mysql-root.env

podman run -d \
  --name mysql \
  --restart=always \
  -p 9200:3306 \
  --env-file ~/.config/mysql-root.env \
  -v mysql-data:/var/lib/mysql \
  docker.io/library/mysql:8.4
```


```bash
mkdir -p ~/.config/systemd/user
cd ~/.config/systemd/user
podman generate systemd --name mysql --files --new
systemctl --user daemon-reload
systemctl --user enable --now container-mysql.service
```

To run the user service without logging in interactively:

```bash
sudo loginctl enable-linger "$USER"
```

Check named volume:

```bash
podman volume ls
```

Bind mount alternative (data at a fixed host path): `-v /var/lib/mysql-data:/var/lib/mysql`

**Data loss** if you run `podman volume rm mysql-data` or wipe the VM disk.

Do **not** commit `~/.config/mysql-root.env`; keep it only on the VM with mode `600`.
