module.exports = {
    apps : [
        {
            name: "boragoweb",
            script: "npm",
            args: "start -- -p 3001",
            env: {
                PORT: 3001
            }
        }
    ]
}