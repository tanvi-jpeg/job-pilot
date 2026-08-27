export default async function handler(req, res) {

    try {

        const params = new URLSearchParams();

        params.set(
            "app_id",
            process.env.ADZUNA_APP_ID
        );

        params.set(
            "app_key",
            process.env.ADZUNA_APP_KEY
        );

        params.set(
            "results_per_page",
            "20"
        );

        params.set(
            "what",
            req.query.q || "software developer"
        );

        params.set(
            "where",
            req.query.where || "India"
        );

        const response = await fetch(
            `https://api.adzuna.com/v1/api/jobs/in/search/1?${params.toString()}`
        );

        const data = await response.json();

        res
            .status(response.status)
            .json(data);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to fetch jobs"
        });

    }

}