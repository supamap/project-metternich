import { CountryData, SaveData } from '../types/SaveData.js';  // Add the .ts extension
import { Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { parseSaveText } from '../utils/saveParser';

interface FileUploadProps {
    onDataLoaded: (newRecord: SaveData) => void;
}

export default function FileUpload({ onDataLoaded }: FileUploadProps) {
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);

        fileArray.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;

                try {
                    const parsed = parseSaveText(result);
                    onDataLoaded(parsed);
                } catch (error) {
                    console.error("Failed to parse save file:", error);
                    alert("Could not parse the file. Please check the format.");
                }
            };

            reader.readAsText(file);
        });
    };

    return (
        <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            sx={{
                color: 'inherit',
                borderColor: 'inherit',
                '&:hover': {
                    borderColor: 'inherit',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
                fontSize: '1.1rem',
            }}
        >
            Upload Save
            <input
                type="file"
                accept=".txt,.yaml,.save"
                onChange={handleFile}
                multiple
                hidden
            />
        </Button>
    );
}
