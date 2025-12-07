package com.bangla.lms.service;

import com.bangla.lms.dto.LessonDTO;
import com.bangla.lms.entity.Course;
import com.bangla.lms.entity.Lesson;
import com.bangla.lms.repository.CourseRepository;
import com.bangla.lms.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;

    @Transactional(readOnly = true)
    public List<LessonDTO> getLessonsByCourseId(Long courseId) {
        return lessonRepository.findByCourseIdOrderByLessonOrderAsc(courseId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<LessonDTO> getLessonById(Long id) {
        return lessonRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Transactional
    public Optional<LessonDTO> createLesson(Long courseId, Lesson lesson) {
        return courseRepository.findById(courseId)
                .map(course -> {
                    lesson.setCourse(course);
                    Lesson savedLesson = lessonRepository.save(lesson);
                    return convertToDTO(savedLesson);
                });
    }

    @Transactional
    public Optional<LessonDTO> updateLesson(Long id, Lesson lessonDetails) {
        return lessonRepository.findById(id)
                .map(lesson -> {
                    lesson.setTitle(lessonDetails.getTitle());
                    lesson.setVideoUrl(lessonDetails.getVideoUrl());
                    lesson.setContent(lessonDetails.getContent());
                    lesson.setLessonOrder(lessonDetails.getLessonOrder());
                    Lesson updated = lessonRepository.save(lesson);
                    return convertToDTO(updated);
                });
    }

    @Transactional
    public boolean deleteLesson(Long id) {
        return lessonRepository.findById(id)
                .map(lesson -> {
                    lessonRepository.delete(lesson);
                    return true;
                })
                .orElse(false);
    }

    private LessonDTO convertToDTO(Lesson lesson) {
        LessonDTO dto = new LessonDTO();
        dto.setId(lesson.getId());
        dto.setCourseId(lesson.getCourse().getId());
        dto.setTitle(lesson.getTitle());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setContent(lesson.getContent());
        dto.setLessonOrder(lesson.getLessonOrder());
        return dto;
    }
}
